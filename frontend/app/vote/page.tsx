"use client"
import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import { useEffect, useState } from 'react';

export default function Page() {

    const [voters, setVoters] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || '';
        getVoters(token)
            .then((res) => setVoters(res))
            .catch((err) => console.log(err));

        console.log(voters)
    }, []);

    return (
        <div className="container mx-auto">

            <div className="flex flex-row-reverse ... p-2">
                <button className="btn btn-outline btn-accent m-1">Log out</button>
            </div>

            <div className="content flex items-center justify-center h-screen">
                <div className="whiteBackground w-1/2 bg-[#fafaf9] p-4 rounded-md">

                    <div className="presidentSection">

                        <div className="presidentTitle text-2xl font-bold text-center m-2">
                            Presidents
                        </div>

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

                        <div className="vicePresidentTitle text-2xl font-bold text-center m-2">
                            Vice Presidents
                        </div>

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

                    <div className="bottomSection">
                        <div className="flex flex-row-reverse ... p-2 bg-[#fafaf9]">
                            <button className="btn btn-outline btn-black m-1">Review</button>
                            <button className="btn btn-outline btn-black m-1">Clear</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}