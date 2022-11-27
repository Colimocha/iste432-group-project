import { TabGroup } from '#/components/TabGroup';
import { userTabItems } from '#/lib/UserTabItem';
import VoterList from '../../../../components/dashboard/VoterList';

export default function Page() {
  return (
    <>
      <div className="mb-4">
        <TabGroup path="/dashboard/user" items={userTabItems} />
      </div>
      <div className="w-full">
        <VoterList />
      </div>
    </>
  );
}
