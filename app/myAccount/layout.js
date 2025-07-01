import Sidebar from "@/components/sidebar/sidebar";


export default function AccountLayout({ children }) {
  return (

    <>
      <div className="w-11/12  md:w-10/12  mx-auto py-12 grid grid-cols-1 lg:grid-cols-[30%_70%] min-h-[400px]">
        {/* Left Sidebar */}
        <Sidebar></Sidebar>
        {children}


      </div>

    </>

  );
}
