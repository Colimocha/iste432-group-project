export default function Page() {
    return (
        <div className="container mx-auto">

            <div className="flex flex-row-reverse ... p-2 bg-[#fafaf9]">
                {/* <button className="btn btn-outline m-1">Log out</button>
                <button className="btn btn-outline btn-primary m-1">Button</button>
                <button className="btn btn-outline btn-secondary m-1">Button</button> */}
                <button className="btn btn-outline btn-accent m-1">Log out</button>

            </div>
            <div className="content flex items-center justify-center h-screen">
                <div className="whiteBackground w-1/2 bg-[#fafaf9] p-4">
                    <div className="columns-3">

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="columns-3 pt-4">

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="card w-30 glass">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Life hack</h2>
                                <p>How to park your car at your garage?</p>
                                <div className="card-actions justify-end">
                                    <input type="checkbox" checked className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}