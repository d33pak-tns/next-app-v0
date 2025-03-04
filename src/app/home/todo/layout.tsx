const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main style={{ margin: "8px", boxSizing: "content-box" }}>{children}</main>
  );
};

export default TodoLayout;
