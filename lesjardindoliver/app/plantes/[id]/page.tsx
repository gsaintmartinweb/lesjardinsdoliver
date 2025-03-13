import PlantePage from "./plant-page";

type PageProps = {
  params: {
    id: string;
  };
};

export function Page(props: PageProps) {
  return <PlantePage params={props.params} />;
}

export default Page;