import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    // Replace with your actual EmailJS public key
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized');
    } else {
      console.warn('EmailJS public key not found. Set VITE_EMAILJS_PUBLIC_KEY in .env');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Template parameters that match your EmailJS template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    // Get EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3zgve99';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('Attempting to send email with params:', {
      serviceId,
      templateId: templateId ? 'Set' : 'Not set',
      publicKey: publicKey ? 'Set' : 'Not set',
      templateParams
    });

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('SUCCESS!', response.status, response.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('FAILED...', error);
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        message: error.message
      });
      setIsSubmitting(false);
      setSubmitStatus('error');

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section bg-background-secondary">
      <div className="container-medium">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-display mb-6">Let's Connect</h2>
          <p className="text-body max-w-2xl mx-auto">
            I'm always interested in new opportunities, research collaborations, 
            and meaningful conversations about AI and human cognition.
          </p>
        </motion.div>

        <div className="grid-asymmetric">
          {/* Contact Info */}
          <motion.div
            className="content-sidebar space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-display text-xl">Get in Touch</h3>
                <p className="text-body leading-relaxed">
                  Whether you're interested in collaboration, have questions about my research, 
                  or just want to chat about AI and cognition, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center mt-1">
                    <div className="w-4 h-4 bg-accent-orange rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-caption">Email</div>
                    <div className="text-body">mohakprakash2016@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center mt-1">
                    <div className="w-4 h-4 bg-accent-orange rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-caption">Location</div>
                    <div className="text-body">San Diego, CA</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center mt-1">
                    <div className="w-4 h-4 bg-accent-orange rounded-full"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-caption">LinkedIn</div>
                    <div className="text-body interactive-subtle cursor-pointer">
                      linkedin.com/in/mohak
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="content-main"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-caption block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-caption block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-caption block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-textarea"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-minimal" />
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-accent-orange/10 border border-accent-orange/20 rounded-lg text-accent-orange text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-medium">Message sent successfully!</div>
                  <div className="text-sm mt-1 text-text-muted">I'll get back to you soon.</div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="font-medium">Failed to send message</div>
                  <div className="text-sm mt-1">Please try again or email me directly at mohakprakash2016@gmail.com</div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
