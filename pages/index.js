import { useForm } from 'react-hook-form'
import { get as fetch } from 'axios'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    fetch('/api/create?name=' + d.name)
    .then(r => alert(r.data));
  }
  const names = useSWR('/api/all', fetcher).data;
  return (
    <div className="dark:text-white dark:bg-black">
      <main>
        <section className="w-1/2 mx-auto bg-gray-200 rounded-xl p-10 mt-16">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <label htmlFor="name">name (required)</label>
            <input className="bg-gray-200 border-b-2 border-gray-400 focus-within:outline-none focus-within:border-gray-600" type="text" id="name" placeholder="Orpheus Haxx" {...register("name", { required: true })} />
            <input type="submit" className="bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-xl font-bold" value="Submit"/>
          </form>
        </section>
        <section className="flex flex-col bg-gray-200 w-1/2 mx-auto rounded-xl p-10 mt-16">
          <h1 className="font-bold text-xl mb-2">Names</h1>
          {
            names?.map(({name}) => (
              <p className="font-mono">- {name}</p>
            ))
          }
        </section>
      </main>
    </div>
  )
}
