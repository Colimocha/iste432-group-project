import { TabGroup } from '#/components/TabGroup';
import { userTabItems } from '#/lib/UserTabItem';

export default function Page() {
  return (
    <>
      <div className="mb-4">
        <TabGroup path="/dashboard/user" items={userTabItems} />
      </div>
      Employee Page
    </>
  );
}
