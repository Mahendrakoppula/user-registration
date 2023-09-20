"use client";

import Input from "@/components/input";
import Select from "@/components/select";
import Wraper from "@/components/wraper";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { handleSubmit } = useFormik({
    initialValues: {
      trainingCenter: "",
      medium: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      console.log(values);
      router.push("/payment");
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex  items-center justify-center h-32">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Registration
          </span>{" "}
          Form
        </h1>
      </div>

      <form onClick={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            label="Training center"
            id="training_center"
            placeholder="Training center"
            name="trainingCenter"
          />

          <Input
            type="text"
            label="Medium"
            id="medium"
            placeholder="Medium"
            name="medium"
          />
          <Input
            type="text"
            label="First name"
            id="first_name"
            placeholder="John"
            name="firstName"
          />
          <Input
            type="text"
            label="Last name"
            id="last_name"
            placeholder="Doe"
            name="lastName"
          />
        </div>
        <div className="mb-6">
          <Wraper label="Gender">
            <div className="flex flex-row items-center gap-4 ">
              <div className="flex items-center">
                <Input type="radio" className="w-4 h-4" />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <Input type="radio" className="w-4 h-4" />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
          </Wraper>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Select label="Blood group">
            <option value="A+">A+</option>
            <option value="US">B+</option>
            <option value="DE">O+</option>
            <option value="DE">AB+</option>
            <option value="CA">A-</option>
            <option value="FR">B-</option>
            <option value="DE">O-</option>
            <option value="DE">AB-</option>
          </Select>

          <Input type="date" label="Date of Brith" id="date_of_brith" />

          <Input
            type="text"
            label="S/o or W/o D/o"
            id="s/o_or_w/o_d/o"
            placeholder="S/o or W/o D/o"
            name="s/oOrW/oD/o"
          />
        </div>

        {/* Docs Upload */}

        <div className="mb-6">
          <Input
            label="Id Proof( Aadhar/Driving license/Passsport )"
            type="file"
            placeholder="Id Proof( Aadhar/Driving license/Passsport )"
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input type="email" label="Email" placeholder="Enter your email" />
          <Input
            type="text"
            label="Nationality"
            value={"India"}
            placeholder="Your Nationality"
          />
        </div>
        <div className="mb-6">
          <Wraper label="Residential Address">
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </Wraper>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            type="text"
            label="Church membership"
            placeholder="Church membership"
          />

          <Input
            type="text"
            label="Name of the pastor"
            placeholder="Name of the pastor"
          />

          <Input
            type="tel"
            label="Contact Number"
            placeholder="Contact Number"
          />
          <Input
            type="tel"
            label="Alternate Number"
            placeholder="Alternate Number"
          />
          <Input
            type="text"
            label="Education Qualification"
            placeholder="Education Qualification"
          />
          <Input
            type="tel"
            label="Occupation"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
        </div>
        <div className="mb-6">
          <Wraper label="10th Qualified?">
            <div className="flex flex-row items-center gap-4 ">
              <div className="flex items-center">
                <Input type="radio" className="w-4 h-4" />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <Input type="radio" className="w-4 h-4" />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
          </Wraper>
        </div>
        <div className="grid gap-6 mb-6">
          <Input
            label="10th certificate"
            type="file"
            placeholder=" 10th certificate"
          />
          <Input
            label="PassPort size photo"
            type="file"
            placeholder="PassPort size photo"
          />
          <Input label="Signature" type="file" placeholder="Signature" />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
        
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
