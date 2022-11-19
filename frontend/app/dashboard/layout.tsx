import DashboardNav from '#/components/DashboardNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardNav />
      <div className="lg:pl-80">
        <div className="mx-auto max-w-full space-y-8 px-4 pt-20 lg:py-4 lg:px-8">
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-white p-3.5 lg:p-6">{children}</div>
          </div>
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-white">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="p-3.5 lg:px-5 lg:py-3">
      <div className="flex items-center justify-center space-x-1.5">
        <div className="text-sm text-black">
          &copy; 2022 - ISTE 432 <b>Team 1</b> - Xiangyu Shi, Zhencheng Chen,
          and Quoc Nhan. All Right Reserved.
        </div>
      </div>
    </div>
  );
}
