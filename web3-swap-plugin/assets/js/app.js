document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connect-wallet-button');
    const swapButton = document.getElementById('swap-button');

    let provider = null;
    let walletAddress = null;

    // MetaMask connection
    async function connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            walletAddress = accounts[0];
            connectWalletButton.textContent = `MetaMask: ${walletAddress.slice(0, 6)}...`;
        } else {
            alert('MetaMask is not installed!');
        }
    }

    // WalletConnect connection
    async function connectWalletConnect() {
        const walletConnectProvider = new WalletConnectProvider.default({
            rpc: {
                137: 'https://polygon-rpc.com', // Polygon Mainnet RPC
            },
        });

        await walletConnectProvider.enable();
        provider = new ethers.providers.Web3Provider(walletConnectProvider);
        const accounts = await provider.listAccounts();
        walletAddress = accounts[0];
        connectWalletButton.textContent = `WalletConnect: ${walletAddress.slice(0, 6)}...`;
    }

    // Phantom Wallet connection
    async function connectPhantom() {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                walletAddress = response.publicKey.toString();
                connectWalletButton.textContent = `Phantom: ${walletAddress.slice(0, 6)}...`;
            } catch (err) {
                console.error('Phantom connection failed', err);
            }
        } else {
            alert('Phantom Wallet not found!');
        }
    }

    // Connect wallet based on user selection
    connectWalletButton.addEventListener('click', async () => {
        const choice = prompt('Select wallet: 1) MetaMask, 2) WalletConnect, 3) Phantom');

        switch (choice) {
            case '1':
                await connectMetaMask();
                break;
            case '2':
                await connectWalletConnect();
                break;
            case '3':
                await connectPhantom();
                break;
            default:
                alert('Invalid choice!');
                break;
        }
    });

    // Swap button logic
    swapButton.addEventListener('click', async () => {
        const amount = document.getElementById('amount').value;

        if (!amount || parseFloat(amount) <= 0) {
            alert('Enter a valid amount');
            return;
        }

        if (!walletAddress) {
            alert('Connect your wallet first');
            return;
        }

        alert(`Swapping ${amount} tokens from wallet: ${walletAddress}`);
        // Add DEX contract interaction here
    });
});
