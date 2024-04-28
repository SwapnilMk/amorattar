import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import { Link } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products..
]



const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
]



const CheckoutPage = () => {
    return (
        <>
            <MainLayout>
                <div className="px-4 mx-auto my-16 max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <div className="lg:col-span-3">
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <form>
                                    <div className="pb-12 border-b border-gray-900/10">
                                        <h2 className="text-3xl leading-7 text-gray-900 font -semibold">Personal Information</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    First name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Last name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Country
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option>india</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option>
                                                        <option>United States</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Street address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2 sm:col-start-1">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        autoComplete="address-level2"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State / Province
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="region"
                                                        id="region"
                                                        autoComplete="address-level1"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                    ZIP / Postal code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="postal-code"
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-12 border-b border-gray-900/10">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose form existing Address
                                        </p>
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {people.map((person) => (
                                                <li key={person.email} className="flex justify-between py-5 gap-x-6">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input

                                                            name="address"
                                                            type="radio"
                                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                        />
                                                        <img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                                        <div className="flex-auto min-w-0">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{person.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                                        {person.lastSeen ? (
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                            </p>
                                                        ) : (
                                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                                <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                                                <div className="mt-6 space-y-6">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="cash"
                                                            name="payMethod"
                                                            type="radio"
                                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Cash
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="card"
                                                            name="payMethod"
                                                            type="radio"
                                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                            card payments
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mt-6 gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form >
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="px-0 py-0 border-t border-gray-200 sm:px-6">
                                <h2 className='my-4 text-4xl font-bold tracking-tight text-gray-900'>Cart</h2>
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                                    <img
                                                        src={product.imageSrc}
                                                        alt={product.imageAlt}
                                                        className="object-cover object-center w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 ml-4">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">{product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    </div>
                                                    <div className="flex items-end justify-between flex-1 text-sm">
                                                        <div className="flex items-center justify-center">
                                                            <p className="text-gray-500">Qty
                                                            </p>
                                                            <Select>
                                                                <SelectTrigger className="w-auto">
                                                                    <SelectValue placeholder="1" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="1">1</SelectItem>
                                                                    <SelectItem value="2">2</SelectItem>
                                                                    <SelectItem value="3">3</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    to="/payment"
                                    className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                                >
                                    Pay Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default CheckoutPage