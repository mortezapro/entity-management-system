import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Checkbox from "@/Components/Checkbox.jsx";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard({ auth }) {
    const [entityValues, setEntityValues] = useState({
        name: "posts",
        storage_engine: "InnoDB",
        collation: "utf8_general_ci",
        table_comments: "test comments for table products",
    });
    const [columnValues, setColumnValues] = useState([
        { name: "id", type: "BIGINT",auto_increment:true },
        { name: "title", type: "VARCHAR" },
        { name: "price", type: "DECIMAL" },
        { name: "description", type: "VARCHAR" },
        { name: "content", type: "TEXT" },
    ]);
    const [relationValues, setRelationValues] = useState([
        { primary_key: "id", foreign_key: "product",main_table_id:"2",reference_table_id:"3" },
        { primary_key: "id", foreign_key: "user",main_table_id:"4",reference_table_id:"3" },
    ]);
    const handleSubmit = (event) => {
        event.preventDefault()
        const values = {
            ...entityValues,
            columns: columnValues,
            relations:relationValues,
        };
        axios.post(route("entity.store"), values)
            .then(() => {
                notify("عملیات با موفقیت انجام شد")

            })
            .catch((error) => {
                console.log(error)
                notify(error);
            });
    }
    const notify = (message) => {
        toast.success(message)
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Super Entity</h2>}
        >
            <Head title="entity management system" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-3 lg:px-8">
                    <form onSubmit={handleSubmit} id="entity-from">
                        <div className="grid grid-cols-12">
                            <div className="col-span-4 md:col-span-4 pe-2">
                                <div className="p-4 sm:p-8 bg-white sm:rounded mb-3">
                                    <div className="mb-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="question">Table Name</label>
                                        <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="question"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="question">Storage Engine</label>
                                        <select name="" id="" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                            <option value="1">InnoDB</option>
                                            <option value="2">MyISAM</option>
                                            <option value="2">CSV</option>
                                            <option value="2">Aria</option>
                                            <option value="2">MEMORY</option>
                                            <option value="2">MEMORY</option>
                                            <option value="2">SEQUENCE</option>
                                            <option value="2">MRG_MyISAM</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="question">Collation</label>
                                        <select name="" id="" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                            <option value="1">utf8_general_ci</option>
                                            <option value="2">utf8_persian_ci</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="question">Table comments</label>
                                        <textarea className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5"/>
                                    </div>
                                    <span className="mb-4 pb-2 block mt-3 border-b border-solid border-slate-200">Generate Files</span>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-controller-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-controller-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate Controller With RestFul CRUD</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-model-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-model-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate Model</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-views-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-views-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate CRUD Views (ReactJs)</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-form-request-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-form-request-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate Form Request</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-eloquent-resource-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-eloquent-resource-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate Eloquent Resource</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-service-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-service-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate Service</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="generate-routes-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="generate-routes-checkbox" className="ms-2 text-sm font-medium text-gray-900">Generate CRUD Rotes</label>
                                    </div>
                                    <span className="mb-4 pb-2 block mt-3 border-b border-solid border-slate-200">Setting</span>
                                    <div className="flex items-center mb-4">
                                        <input id="caching-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" checked/>
                                        <label htmlFor="caching-checkbox" className="ms-2 text-sm font-medium text-gray-900">Enable Caching (Redis)</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="caching-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                                        <label htmlFor="caching-checkbox" className="ms-2 text-sm font-medium text-gray-900">Enable Soft Delete</label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input id="caching-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                                        <label htmlFor="caching-checkbox" className="ms-2 text-sm font-medium text-gray-900">Enable Activity Log</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-8 md:col-span-8 ps-2">
                                <div className="p-4 sm:p-8 bg-white sm:rounded mb-4">
                                    <div className="grid grid-cols-2">
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Column Name</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_type">Column Type</label>
                                            <select name="" id="column_type" className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5">
                                                <option value="1">int</option>
                                                <option value="1">varchar</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 mt-5">
                                            <a href="#" className="me-3 bg-blue-500 hover:bg-blue-500 text-white text-sm hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add New Column</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-8 bg-white sm:rounded mb-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3">
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Foreign Key (1)</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3 pe-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">Reference Table (1)</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="column_name">primary key (1)</label>
                                            <input className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-900 text-sm rounded block w-full p-2.5" id="column_name"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-5">
                                        <a href="#" className="me-3 bg-blue-500 hover:bg-blue-500 text-white text-sm hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add New Relation</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 sm:p-8 bg-white sm:rounded">
                            <div className="bg-white sm:rounded">
                                <div className="flex">
                                    <button type="submit"
                                            className="me-3 bg-blue-500 hover:bg-blue-500 text-white text-sm hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Save
                                    </button>
                                    <a type="submit" className="me-3 bg-transparent text-red-500 text-sm hover:text-white hover:border-red-500 hover:bg-red-500 py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                       href="https://dunke.jayezedoon.ir/questions">Back</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" rtl={true} pauseOnFocusLoss/>
        </AuthenticatedLayout>
    );
}
