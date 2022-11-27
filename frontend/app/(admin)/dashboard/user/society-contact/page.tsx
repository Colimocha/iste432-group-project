import { TabGroup } from '#/components/TabGroup';
import { userTabItems } from '#/lib/UserTabItem';
import SocietyList from '../../../../../components/dashboard/SocietyContactList';


export default function Page() {
  return (
    <>
      <div className="mb-4">
        <TabGroup path="/dashboard/user" items={userTabItems} />
      </div>
      <SocietyList />
    </>
  );
}
