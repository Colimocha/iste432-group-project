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

    // handle for Go Back button
    const handleGoBack = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }

    // handle for Submit button
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        router.push('/vote/review/result');
    }

    return (
        <div className="container">

            {/* top bar */}
            <div className="flex flex-row-reverse ... p-2">
                <button className="btn btn-outline btn-accent m-1" onClick={handleLogout}>Log out</button>
            </div>
            {/* end of top bar */}

            {/* ballot name */}
            <div className="content flex items-center justify-center">
                <div className="whiteBackground w-1/2 text-4xl text-white font-bold text-center p-5">
                    Ballot Name
                </div>
            </div>
            {/* end of ballot name */}

            <div className="content flex items-center justify-center">

                {/* white background */}
                <div className="whiteBackground w-2/3 bg-[#fafaf9] p-3 rounded-md">

                    {/* president section */}
                    <div className="presidentSection">

                        {/* president title */}
                        <div className="presidentTitle text-2xl font-bold text-center m-2">
                            Review
                        </div>
                        {/* end of president title */}

                        <div className="presidentItems columns-5">

                            <div>
                                <div className="presidentTitle text-base font-bold text-center">President</div>
                                <div className="presidentCard w-30 glass">
                                    <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Life hack</h2>
                                        <p>How to park your car at your garage?</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="vicePresidentTitle text-base font-bold text-center">Vice President</div>
                                <div className="vicePresidentCard w-30 glass">
                                    <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Life hack</h2>
                                        <p>How to park your car at your garage?</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="secretaryTitle text-base font-bold text-center">Secretary</div>
                                <div className="secretaryCard w-30 glass">
                                    <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Life hack</h2>
                                        <p>How to park your car at your garage?</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="treasurerTitle text-base font-bold text-center">Treasurer</div>
                                <div className="treasurerCard w-30 glass">
                                    <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Life hack</h2>
                                        <p>How to park your car at your garage?</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="treasurerTitle text-base font-bold text-center">Treasurer</div>
                                <div className="treasurerCard w-30 glass">
                                    <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Life hack</h2>
                                        <p>How to park your car at your garage?</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bottomSection">
                        <div className="flex flex-row-reverse ... p-2 bg-[#fafaf9]">
                            <button className="btn btn-outline btn-black m-1" onClick={handleSubmit}>Submit</button>
                            <button className="btn btn-outline btn-black m-1" onClick={handleGoBack}>Go Back</button>
                        </div>
                    </div>
                </div>
                {/* end of white background */}
            </div>
        </div>
    );
}