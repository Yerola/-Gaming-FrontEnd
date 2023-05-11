import React from 'react';
import { Form,TextArea,Radio } from "semantic-ui-react";
import { AiOutlineStar } from 'react-icons/ai';
import { useFormik } from "formik";
import { initialValues,validationSchema } from './ReviewForm.Form';

import { Review as ReviewCtrl} from "@/api";

const reviewCtrl = new ReviewCtrl();


export function ReviewForm(props) {
  
  const {userId,gameId}=props;


  const formik=useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async(formValue)=>{
      const {review,rating}=formValue;

      try {
       const response=await reviewCtrl.add(userId,gameId,review,rating)
       console.log(userId,gameId,review,rating)
      } catch (error) {
        
      }
      console.log("enviado")
    }
})

  return (
    <div>
        <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="review"
          control={TextArea}
          placeholder="Reseña"
          label="Reseña" 
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.errors.review}
        />
        <Form.Input
        name="rating"
        type='number'
        value={formik.values.rating}
        onChange={formik.handleChange}
        error={formik.errors.rating}
        />

        <Form.Button primary type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>

        </Form>
{/*         <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/>
        <AiOutlineStar/> */}

    </div>
  )
}