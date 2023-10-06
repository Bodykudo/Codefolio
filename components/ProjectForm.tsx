'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { categoryFilters } from '@/constants';
import { ProjectInterface, SessionInterface } from '@/types';
import { createProject, editProject, fetchToken } from '@/lib/actions';
import FormField from './FormField';
import SelectField from './SelectField';
import Button from './Button';

type Props = {
  type: 'create' | 'edit';
  session: SessionInterface;
  project?: ProjectInterface;
};

export default function ProjectForm({ type, session, project }: Props) {
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteURL: project?.liveSiteURL || '',
    githubURL: project?.githubURL || '',
    figmaURL: project?.figmaURL || '',
    category: project?.category || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();

    const loading = toast.loading(
      type === 'create' ? 'Creating project...' : 'Editing project...'
    );
    try {
      if (type === 'create') {
        await createProject(form, session?.user?.id, token);
        toast.remove(loading);
        toast.success('Project created successfully!');
      }

      if (type === 'edit') {
        await editProject(form, project?.id || '', token);
        toast.remove(loading);
        toast.success('Project updated successfully!');
      }
    } catch (error) {
      toast.remove(loading);
      toast.error(
        type === 'create'
          ? 'Project failed to create 😟'
          : 'Project failed to edit 😟'
      );
    } finally {
      setIsSubmitting(false);
      router.push('/');
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes('image')) {
      const loading = toast.loading('Uploading...');
      setTimeout(() => {
        toast.remove(loading);
        toast.error('Please upload an image');
      }, 1500);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-start gap-10 pt-12 text-lg"
    >
      <div className="relative flex min-h-[12.5rem] w-full items-center justify-start lg:min-h-[25rem]">
        <label
          htmlFor="poster"
          className="z-10 flex h-full w-full items-center justify-center border-2 border-dashed border-gray-50 p-20 text-center text-gray-100"
        >
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          // accept="image/*"
          required={type === 'create'}
          className="absolute z-30 h-full w-full cursor-pointer opacity-0"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="z-20 object-contain sm:p-10"
            alt="Project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Codefolio"
        isRequired
        setState={(value: string) => handleStateChange('title', value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isRequired
        isTextArea
        setState={(value: string) => handleStateChange('description', value)}
        maxChars={2000}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteURL}
        placeholder="https://codefolio.vercel.app"
        setState={(value: string) => handleStateChange('liveSiteURL', value)}
      />

      <FormField
        type="url"
        title="Github URL"
        state={form.githubURL}
        placeholder="https://github.com/Bodykudo/Codefolio"
        setState={(value: string) => handleStateChange('githubURL', value)}
      />

      <FormField
        type="url"
        title="Figma Prototype URL"
        state={form.figmaURL}
        placeholder="https://www.figma.com/proto/XXXXXXXXX/Codefolio"
        setState={(value: string) => handleStateChange('figmaURL', value)}
      />

      {/* CustomInput Category... */}
      <SelectField
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value: string) => handleStateChange('category', value)}
      />

      <div className="flex w-full items-center justify-start">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating...' : 'Editing...'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isDisabled={isSubmitting}
        />
      </div>
    </form>
  );
}
