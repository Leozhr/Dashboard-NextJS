'use client'
import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface IssueForm {
  title: string
  description: string
}

const createIssueSchema = z.object({
  title: z.string().min(1, 'title is required').max(255),
  description: z.string().min(1, 'description is required').max(255),
})

type IssueFomat = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const [error, setError] = useState('')

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
