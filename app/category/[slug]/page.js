import FoodItems from "@/app/components/home/foods";

const Page = ({ params }) => {
  const category = params.slug;
  return (
    <div>
      <FoodItems category={category} />
    </div>
  );
};

export default Page;
