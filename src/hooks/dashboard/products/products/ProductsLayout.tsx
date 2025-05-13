"use client"

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronRight, CirclePlus } from "lucide-react"

import { ProductsContent } from '@/hooks/dashboard/products/products/types/products'

import { ContentModal } from './modal/ContentModal'

import { DeleteModal } from './modal/DeleteModal'

import Image from 'next/image'

import { createProductsContent, getProductsContents, updateProductsContent, deleteProductsContent } from '@/hooks/dashboard/products/products/lib/products'

import toast from 'react-hot-toast'

import HomeSkelaton from "@/hooks/dashboard/products/products/ProductsSkelaton"

import { usePagination } from '@/base/helper/pagination/usePagination'

import Pagination from '@/base/helper/pagination/Pagination'

export default function HomeLayout() {
    const [contents, setContents] = useState<ProductsContent[]>([])
    const [selectedContent, setSelectedContent] = useState<ProductsContent | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isContentModalOpen, setIsContentModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [formData, setFormData] = useState<ProductsContent>({
        title: '',
        description: '',
        category: '',
        rating: 0,
        price: 0,
        imageUrl: ''
    })

    const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
        items: contents,
        itemsPerPage: 6
    })

    const fetchContents = async () => {
        try {
            setIsLoading(true)
            const data = await getProductsContents()
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
            description: '',
            category: '',
            rating: 0,
            price: 0,
            imageUrl: ''
        })
        setSelectedImage(null)
        setIsContentModalOpen(true)
    }

    const handleEdit = (content: ProductsContent) => {
        setSelectedContent(content)
        setFormData(content)
        setSelectedImage(null)
        setIsContentModalOpen(true)
    }

    const handleDelete = (content: ProductsContent) => {
        setSelectedContent(content)
        setIsDeleteModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            if (!selectedImage && !formData.imageUrl) {
                toast.error('Please select an image')
                return
            }

            if (selectedContent) {
                await updateProductsContent(selectedContent.id!, formData, selectedImage || undefined)
                toast.success('Content updated successfully')
            } else {
                if (!selectedImage) {
                    toast.error('Please select an image')
                    return
                }
                await createProductsContent(formData, selectedImage)
                toast.success('Content created successfully')
            }

            setIsContentModalOpen(false)
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
            await deleteProductsContent(selectedContent!.id!)
            toast.success('Content deleted successfully')
            setIsDeleteModalOpen(false)
            fetchContents()
        } catch {
            toast.error('Failed to delete content')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <HomeSkelaton />
        )
    }

    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Home</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard">Dashboard</Link></li>
                        <li className="text-sm font-medium"><ChevronRight className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Home</li>
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

            {contents.length === 0 ? (
                <div className="text-center py-20">
                    <div className="max-w-md mx-auto">
                        <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M150 100C150 100 180 100 200 100C220 100 250 100 250 100C250 100 260 110 260 120C260 130 250 140 250 140C250 140 220 140 200 140C180 140 150 140 150 140C150 140 140 130 140 120C140 110 150 100 150 100Z" fill="#4A5568" />
                            <path d="M140 140C140 140 150 150 150 160C150 170 150 180 150 180C150 180 180 180 200 180C220 180 250 180 250 180C250 180 250 170 250 160C250 150 260 140 260 140" stroke="#2D3748" strokeWidth="4" />
                            <path d="M180 80C180 80 185 70 190 65C195 60 200 55 200 55" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                            <path d="M200 80C200 80 205 70 210 65C215 60 220 55 220 55" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                            <path d="M220 80C220 80 225 70 230 65C235 60 240 55 240 55" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Products Found</h2>
                    <p className="text-gray-500">Click the create button to add your first product</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        {currentItems.map((content) => (
                            <div key={content.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                <div className="relative w-full aspect-[4/3] bg-gray-50">
                                    {content.imageUrl ? (
                                        <Image
                                            src={content.imageUrl}
                                            alt={content.title || 'Content image'}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover rounded-none"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                    {/* Rating badge */}
                                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow text-xs font-semibold text-gray-800">
                                        {content.rating}
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col p-4 pb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{content.title}</h3>
                                        <span className="text-lg font-bold text-gray-900">{content.price} K</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{content.description}</p>
                                    <div className="flex justify-end mt-auto gap-2">
                                        <button
                                            onClick={() => handleEdit(content)}
                                            className="bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-full p-3 shadow transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content)}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 rounded-full p-3 shadow transition-colors duration-200"
                                            title="Delete"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M3 6h18" />
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {pageCount > 1 && (
                        <Pagination
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </>
            )}

            {/* Modals */}
            <ContentModal
                isOpen={isContentModalOpen}
                onClose={() => setIsContentModalOpen(false)}
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={!!selectedContent}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
            />
        </section>
    )
}
