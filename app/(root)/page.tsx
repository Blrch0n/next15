import StartUpCard from "@/components/ui/StartUpCard";
import SearchForm from "../../components/ui/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "John Doe" },
  //     _id: 1,
  //     description: "This is a description",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/149/596/863/mr-robot-elliot-mr-robot-tv-fsociety-wallpaper-preview.jpg",
  //     category: "Robots",
  //     title: "Mr Robot",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartUpCardType) => (
              <StartUpCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
