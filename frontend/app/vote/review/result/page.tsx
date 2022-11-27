"use client"
import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {

    const [voters, setVoters] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token') || '';
        getVoters(token)
            .then((res) => setVoters(res))
            .catch((err) => console.log(err));

        console.log(voters)
    }, []);

    // handle for Logout button
    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        sessionStorage.removeItem('token');
        router.push('/auth');
    }

    return (
        <div className="container">

            {/* top bar */}
            <div className="flex flex-row-reverse ... p-2">
                <button className="btn btn-outline btn-accent m-1" onClick={handleLogout}>Log out</button>
            </div>
            {/* end of top bar */}

            <div className="content flex items-center justify-center">

                {/* white background */}
                <div className="whiteBackground w-2/3 bg-[#fafaf9] p-3 rounded-md">

                    <div className="resultMessage font-bold text-center">
                        Thank you for your vote for (society name)!
                        <br />
                        Confirmation Number: A5GF112KP
                    </div>

                    <div className="resultMessage font-bold text-center">
                        There is no ballot for you to vote.
                        <br />
                        Please check in with your society contact if you think this is a mistake.
                    </div>
                </div>
                {/* end of white background */}
            </div>
        </div>
    );
}