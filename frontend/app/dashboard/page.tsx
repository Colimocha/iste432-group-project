import Stat from '#/components/Stat';

export default function Page() {
  return (
    <>
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-y-0">
        <Stat title="Voter" value="0" />
        <Stat title="Society Contact" value="0" />
        <Stat title="Employee" value="0" />
        <Stat title="Ballot" value="0" />
        <Stat title="Vote" value="0" />
      </div>
    </>
  );
}
