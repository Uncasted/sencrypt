// This gets rendered when there aren't any buttons in the app.
export default function EmptyPlaceholder() {
  return (
    <div className="w-full h-[85vh] flex flex-col items-center justify-center">
      <h1 className="text-lg lg:text-2xl text-gray-300">
        There isn't any accounts to show.
      </h1>
      <h1 className="text-md lg:text-lg text-gray-300">
        Add a new account by clicking on the "Add new account" button.
      </h1>
    </div>
  )
}
