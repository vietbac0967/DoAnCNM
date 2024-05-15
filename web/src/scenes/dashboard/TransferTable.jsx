import React from 'react';
import './index.scss'
const TransferTable = () => {
    return (
        <table className="transfer-section">
            <thead>
                <tr className="transfer-section-header">
                    <th><h2>Latest transfers</h2></th>
                    <th>
                        <div className="filter-options">
                            <button className="icon-button">
                                <i className="ph-funnel"></i>
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="transfers">
                <tr className="transfer">
                    <td>
                        <div className="transfer-logo">
                            <img src="https://assets.codepen.io/285131/apple.svg" alt="Apple Inc." />
                        </div>
                        <dl className="transfer-details">
                            <div>
                                <dt>Apple Inc.</dt>
                                <dd>Apple ID Payment</dd>
                            </div>
                            <div>
                                <dt>4012</dt>
                                <dd>Last four digits</dd>
                            </div>
                            <div>
                                <dt>28 Oct. 21</dt>
                                <dd>Date payment</dd>
                            </div>
                        </dl>
                    </td>
                </tr>
                <tr className="transfer">
                    <td>
                        <div className="transfer-logo">
                            <img src="https://assets.codepen.io/285131/pinterest.svg" alt="Pinterest" />
                        </div>
                        <dl className="transfer-details">
                            <div>
                                <dt>Pinterest</dt>
                                <dd>2 year subscription</dd>
                            </div>
                            <div>
                                <dt>5214</dt>
                                <dd>Last four digits</dd>
                            </div>
                            <div>
                                <dt>26 Oct. 21</dt>
                                <dd>Date payment</dd>
                            </div>
                        </dl>
                    </td>
                    <td className="transfer-number">
                        - $ 120
                    </td>
                </tr>
                <tr className="transfer">
                    <td>
                        <div className="transfer-logo">
                            <img src="https://assets.codepen.io/285131/warner-bros.svg" alt="Warner Bros." />
                        </div>
                        <dl className="transfer-details">
                            <div>
                                <dt>Warner Bros.</dt>
                                <dd>Cinema</dd>
                            </div>
                            <div>
                                <dt>2228</dt>
                                <dd>Last four digits</dd>
                            </div>
                            <div>
                                <dt>22 Oct. 21</dt>
                                <dd>Date payment</dd>
                            </div>
                        </dl>
                    </td>
                    <td className="transfer-number">
                        - $ 70
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TransferTable;
