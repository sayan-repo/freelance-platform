import React, { useState, createContext } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const browserProvider = new ethers.BrowserProvider(window.ethereum);
                await browserProvider.send("eth_requestAccounts", []);
                const signer = await browserProvider.getSigner();
                const address = await signer.getAddress();
                
                setAccount(address);
                setProvider(browserProvider);
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
    };

    const value = { account, provider, connectWallet, disconnectWallet };

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};