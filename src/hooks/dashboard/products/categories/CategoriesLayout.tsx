"use client"

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronRight, CirclePlus, Pencil, Trash2 } from "lucide-react"

import { CategoriesContent } from './types/categories'

import { ContentModal } from './modal/ContentModal'

import { DeleteModal } from './modal/DeleteModal'

import { createCategoriesContent, getCategoriesContents, updateCategoriesContent, deleteCategoriesContent } from './lib/categories'

import toast from 'react-hot-toast'

import CategoriesSkelaton from "@/hooks/dashboard/products/categories/CategoriesSkelaton"

import Pagination from '@/base/helper/pagination/Pagination'

import { usePagination } from '@/base/helper/pagination/usePagination'

export default function CategoriesLayout() {
    const [contents, setContents] = useState<CategoriesContent[]>([])
    const [selectedContent, setSelectedContent] = useState<CategoriesContent | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState<CategoriesContent>({
        title: '',
    })

    const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
        items: contents,
        itemsPerPage: 10
    })

    const fetchContents = async () => {
        try {
            setIsLoading(true)
            const data = await getCategoriesContents()
            setContents(data)
        } catch {
            toast.error('Failed to fetch contents')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchContents()
    }, [])

    const handleCreate = () => {
        setSelectedContent(null)
        setFormData({
            title: '',
        })
        const modal = document.getElementById('content_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleEdit = (content: CategoriesContent) => {
        setSelectedContent(content)
        setFormData(content)
        const modal = document.getElementById('content_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleDelete = (content: CategoriesContent) => {
        setSelectedContent(content)
        const modal = document.getElementById('delete_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            if (selectedContent) {
                await updateCategoriesContent(selectedContent.id!, formData)
                toast.success('Content updated successfully')
            } else {
                await createCategoriesContent(formData)
                toast.success('Content created successfully')
            }

            const modal = document.getElementById('content_modal') as HTMLDialogElement
            modal?.close()
            fetchContents()
        } catch {
            toast.error('An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            setIsSubmitting(true)
            await deleteCategoriesContent(selectedContent!.id!)
            toast.success('Content deleted successfully')
            const modal = document.getElementById('delete_modal') as HTMLDialogElement
            modal?.close()
            fetchContents()
        } catch {
            toast.error('Failed to delete content')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <CategoriesSkelaton />
        )
    }

    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard">Dashboard</Link></li>
                        <li className="text-sm font-medium"><ChevronRight className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Categories</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCreate}
                        className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <CirclePlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((content) => (
                            <tr key={content.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {content.title}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => handleEdit(content)}
                                            className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                                        >
                                            <Pencil className="w-5 h-5" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content)}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />

            {/* Modals */}
            <ContentModal
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={!!selectedContent}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={() => {
                    const modal = document.getElementById('delete_modal') as HTMLDialogElement
                    modal?.close()
                }}
            />
        </section>
    )
}
