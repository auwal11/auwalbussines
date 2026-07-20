'use client'

import { useState, useRef }
import { motion } from 'framer-motion' from 'react'


export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

