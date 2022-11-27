export default function Page() {
    return (
        <div className="container mx-auto px-4">

            <div className="flex flex-row-reverse ... p-2">
                {/* <button className="btn btn-outline m-1">Log out</button>
                <button className="btn btn-outline btn-primary m-1">Button</button>
                <button className="btn btn-outline btn-secondary m-1">Button</button> */}
                <button className="btn btn-outline btn-accent m-1">Log out</button>

            </div>

            <div className="columns-3 py-4">
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <input type="checkbox" checked className="checkbox checkbox-secondary" />
                        </div>
                    </div>
                </div>

                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <input type="checkbox" checked className="checkbox checkbox-secondary" />
                        </div>
                    </div>
                </div>

                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <input type="checkbox" checked className="checkbox checkbox-secondary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns-3">
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <input type="checkbox" checked className="checkbox checkbox-secondary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}