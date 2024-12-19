import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify/${token}`);
                setVerificationStatus('Email verified successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setVerificationStatus('Verification failed. Invalid or expired token.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">{verificationStatus}</h2>
            </div>
        </div>
    );
};

export default EmailVerify;