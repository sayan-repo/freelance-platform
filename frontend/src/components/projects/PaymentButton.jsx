import { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../hooks/useWallet';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import { recordPayment } from '../../services/api'; // We'll add this to api.js

// Polygon Amoy Testnet USDC Contract Details
const USDC_ADDRESS = '0x41e94Eb019C0762f9BFCcf9Fb14A1e481C82b225';
const USDC_ABI = [ "function transfer(address to, uint256 amount) returns (bool)" ];

const PaymentButton = ({ freelancerAddress, amount, projectId }) => {
    const { provider, account } = useWallet();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!provider || !account) {
            toast.error("Please connect your wallet first.");
            return;
        }
        if (!freelancerAddress || !ethers.isAddress(freelancerAddress)) {
            toast.error("Invalid freelancer wallet address.");
            return;
        }

        setLoading(true);
        try {
            const signer = await provider.getSigner();
            const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
            
            // USDC has 6 decimals, so we need to convert the amount
            const amountInSmallestUnit = ethers.parseUnits(amount.toString(), 6);

            toast.info("Please approve the transaction in MetaMask...");
            const tx = await usdcContract.transfer(freelancerAddress, amountInSmallestUnit);
            
            toast.info("Processing transaction on the blockchain...");
            await tx.wait(); // Wait for the transaction to be mined

            // Once confirmed, record it on our backend
            await recordPayment(projectId, { txHash: tx.hash });

            toast.success("Payment successful! Project marked as paid.");
            // Here you might want to refresh the page or update the project state
            window.location.reload();

        } catch (error) {
            console.error("Payment failed", error);
            toast.error(error?.reason || "Payment failed. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handlePayment} disabled={loading || !account} variant="primary">
            {loading ? 'Processing...' : `Pay ${amount} USDC`}
        </Button>
    );
};

export default PaymentButton;