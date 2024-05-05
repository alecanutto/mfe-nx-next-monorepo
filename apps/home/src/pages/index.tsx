import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
   <>
      <div className="flex flex-col w-full h-[100vh] p-10">
        <h1 className={'text-3xl'}>
          <span> Hello there, </span>
          Welcome home 👋
        </h1>
      </div>
   </>
  );
};

export default Index;
