interface Name {
  readonly name?:
    | 'voter'
    | 'societyContact'
    | 'employee'
    | 'society'
    | 'office'
    | 'ballot'
    | 'candidate';
}

export default function CreateModal(name: Name) {
  return (
    <>
      <a href="#my-modal-2" className="btn">
        Add
      </a>
      <div className="modal" id="my-modal-2">
        <div className="modal-box whitespace-normal">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user! <br />
            {name && name.name?.toUpperCase()}
          </h3>
          <p className="py-4">
            You have been selected for a chance to get one year of subscription
            to use Wikipedia for free!
          </p>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
