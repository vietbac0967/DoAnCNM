import redis from "redis";
import dotenv from "dotenv";
import logger from "../helpers/winston.log.js";

dotenv.config();

// const client = redis.createClient({
//   url: process.env.REDIS_URL,
// });

const client = redis.createClient({
  url: process.env.REDIS_URL,
});
let statusConnectRedis = {
  CONNECT: "connect",
  END: "end",
  RECONNECT: "reconnecting",
  ERROR: "error",
};
let connectionTimeOut;

const REDIS_CONNECT_TIMEOUT = 10000,
  REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: {
      vn: "Redis loi roi",
      en: "Redis is error",
    },
  };

const handleTimeOutError = () => {
  connectionTimeOut = setTimeout(() => {
    throw new Error(REDIS_CONNECT_MESSAGE.message.en);
  }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnect = ({ connectionRedis }) => {
  connectionRedis.on(statusConnectRedis.CONNECT, () => {
    logger.info("Connected to Redis!");
    clearTimeout(connectionTimeOut);
  });
  connectionRedis.on(statusConnectRedis.END, () => {
    logger.info("End to Redis!");
    //connect retry
    handleTimeOutError();
  });
  connectionRedis.on(statusConnectRedis.RECONNECT, () => {
    logger.info("Reconnecting to Redis!");
    clearTimeout(connectionTimeOut);
  });
  connectionRedis.on(statusConnectRedis.ERROR, (err) => {
    logger.info("Error in the Connection:", err);
    handleTimeOutError();
  });
};

// const initRedis = () => {
//   const instanceRedis = (client.instanceConnect = instanceRedis);
//   handleEventConnect({ connectionRedis: instanceRedis });
// };

const connectToRedis = async () => {
  try {
    await client.connect();
    handleEventConnect({ connectionRedis: client });
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error("Error connecting to Redis", err.message);
  }
};

export { connectToRedis, client };
