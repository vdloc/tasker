type FormLayoutProps = {
  Header: React.FunctionComponent;
  Content: React.FunctionComponent;
  Footer: React.FunctionComponent;
  onSubmit?: () => void;
};

export default function FormLayout({ Header, Content, Footer, onSubmit }: FormLayoutProps) {
  return (
    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white dark:bg-indigo-900 shadow-xl rounded-lg" onSubmit={onSubmit}>
      <div className="flex-1">
        {<Header />}
        <div className="flex flex-1 flex-col justify-between ">
          <div className="divide-y divide-gray-200 px-4 md:px-6">
            <div className="space-y-2 pt-6 pb-5">
              <Content />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-end px-4 py-4">
        <Footer />
      </div>
    </form>
  );
}
