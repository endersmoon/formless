export default function Layout({ children }) {
    return (
      <div className="flex h-screen overflow-hidden">
       
        <div className="flex-1 overflow-y-scroll">{children}</div>
        <div className="w-[480px] bg-muted">Preview</div>
       
      </div>
  );
}
