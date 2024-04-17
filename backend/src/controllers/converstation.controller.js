import { getConverstationService } from "../services/conversation.service.js";

export const getConverstations = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await getConverstationService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ EC: 1, EM: error.message, DT: "" });
  }
};
