"use client"

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronRight, CirclePlus, Pencil, Trash2 } from "lucide-react"

import { TestimonialsContent } from './types/testimonials'

import { ContentModal } from './modal/ContentModal'

import { DeleteModal } from './modal/DeleteModal'

import Image from 'next/image'

import { createTestimonialsContent, getTestimonialsContents, updateTestimonialsContent, deleteTestimonialsContent } from '@/hooks/dashboard/testimonials/lib/testimonials'

import toast from 'react-hot-toast'

import TestimonialsSkelaton from "@/hooks/dashboard/testimonials/TestimonialsSkelaton"

export default function HomeLayout() {
    const [contents, setContents] = useState<TestimonialsContent[]>([])
    const [selectedContent, setSelectedContent] = useState<TestimonialsContent | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState<TestimonialsContent>({
        name: '',
        message: '',
        imageUrl: ''
    })

    const fetchContents = async () => {
        try {
            setIsLoading(true)
            const data = await getTestimonialsContents()
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
            name: '',
            message: '',
            imageUrl: ''
        })
        setSelectedImage(null)
        const modal = document.getElementById('content_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleEdit = (content: TestimonialsContent) => {
        setSelectedContent(content)
        setFormData(content)
        setSelectedImage(null)
        const modal = document.getElementById('content_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleDelete = (content: TestimonialsContent) => {
        setSelectedContent(content)
        const modal = document.getElementById('delete_modal') as HTMLDialogElement
        modal?.showModal()
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            if (!selectedImage && !formData.imageUrl) {
                toast.error('Please select an image')
                return
            }

            if (selectedContent) {
                await updateTestimonialsContent(selectedContent.id!, formData, selectedImage || undefined)
                toast.success('Content updated successfully')
            } else {
                if (!selectedImage) {
                    toast.error('Please select an image')
                    return
                }
                await createTestimonialsContent(formData, selectedImage)
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
            await deleteTestimonialsContent(selectedContent!.id!)
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
            <TestimonialsSkelaton />
        )
    }

    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Testimonials</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard">Dashboard</Link></li>
                        <li className="text-sm font-medium"><ChevronRight className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Testimonials</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    {contents.length === 0 && (
                        <button
                            onClick={handleCreate}
                            className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <CirclePlus className="w-4 h-4" />
                            <span>Create</span>
                        </button>
                    )}
                </div>
            </div>

            {
                contents.map((content) => (
                    <div key={content.id} className="bg-white rounded-xl overflow-hidden border border-gray-300 py-10">
                        <div className='flex flex-col md:flex-row items-center'>
                            <div className="relative aspect-[4/3] w-full md:w-1/2">
                                {content.imageUrl ? (
                                    <Image
                                        src={content.imageUrl}
                                        alt={content.name || 'Content image'}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                        <span className="text-gray-400">No image</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 md:w-1/2">
                                <h3 className="text-2xl xl:text-4xl max-w-[500px] font-bold mb-4 text-[var(--primary)]">{content.name}</h3>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-[450px]">{content.message}</p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => handleEdit(content)}
                                        className="px-5 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                                    >
                                        <Pencil className="w-5 h-5" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(content)}
                                        className="px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* Modals */}
            <ContentModal
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
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
