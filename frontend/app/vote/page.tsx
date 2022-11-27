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

    // handle for Clear button
    const handleClear = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    }

    // handle for Review button
    const handleReview = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        router.push('/vote/review');
    }

    return (
        <div className="container">

            <div className="flex flex-row-reverse ... p-2">
                <button className="btn btn-outline btn-accent m-1" onClick={handleLogout}>Log out</button>
            </div>

            {/* ballot name */}
            <div className="content flex items-center justify-center">
                <div className="whiteBackground w-1/2 text-4xl text-white font-bold text-center p-5">
                    Ballot Name
                </div>
            </div>

            {/* end of ballot name */}

            <div className="content flex items-center justify-center">

                {/* white background */}
                <div className="whiteBackground w-1/2 bg-[#fafaf9] p-3 rounded-md">

                    {/* president section */}
                    <div className="presidentSection">

                        {/* president title */}
                        <div className="presidentTitle text-2xl font-bold text-center m-2">
                            Presidents
                        </div>
                        {/* end of president title */}

                        <div className="presidentItems columns-3">

                            <div className="presidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="presidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="presidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="vicePresidentSection pt-4">

                        {/* vice president title */}
                        <div className="vicePresidentTitle text-2xl font-bold text-center m-2">
                            Vice Presidents
                        </div>
                        {/* end of vice president title */}

                        <div className="vicePresidentItems columns-3">

                            <div className="vicePresidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="vicePresidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="vicePresidentCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="secretarySection">

                        <div className="secretaryTitle text-2xl font-bold text-center m-2">
                            Secretary
                        </div>

                        <div className="secretaryItems columns-3">

                            <div className="secretaryCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="secretaryCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="secretaryCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="treasurerSection">

                        <div className="treasurerTitle text-2xl font-bold text-center m-2">
                            Treasurer
                        </div>

                        <div className="treasurerItems columns-3">

                            <div className="treasurerCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="treasurerCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                            <div className="treasurerCard w-30 glass">
                                <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Life hack</h2>
                                    <p>How to park your car at your garage?</p>
                                    <div className="card-actions justify-end">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-secondary" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bottomSection">
                        <div className="flex flex-row-reverse ... p-2 bg-[#fafaf9]">
                            <button className="btn btn-outline btn-black m-1" onClick={handleReview}>Review</button>
                            <button className="btn btn-outline btn-black m-1" onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                </div>
                {/* end of white background */}
            </div>
        </div>
    );
}