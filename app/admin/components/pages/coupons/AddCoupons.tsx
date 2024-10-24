import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AllCouponsNew } from './columns';
import axiosInstance from '@/axios/axiosInstance';

interface AddCouponsProps {
  onAddCoupon: (newCoupon: AllCouponsNew) => void;
}

export default function AddCoupons({ onAddCoupon }: AddCouponsProps) {
  const formik = useFormik({
    initialValues: {
      code: '',
      description: '',
      discount: '',
      type: 'Public',
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Coupon code is required'),
      description: Yup.string().required('Description is required'),
      discount: Yup.number()
        .required('Discount is required')
        .min(0, 'Discount must be at least 0')
        .max(100, 'Discount cannot exceed 100'),
      type: Yup.string().required('Type is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().required('End date is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Create date objects and format them as required
        const startDate = new Date(values.startDate);
        const endDate = new Date(values.endDate);
        
        // Set endDate to the end of the day
        endDate.setHours(23, 59, 59, 999);

        const formattedValues = {
          ...values,
          startDate: startDate.toISOString(), // Format to ISO string
          endDate: endDate.toISOString(),     // Format to ISO string
        };

        const response = await axiosInstance.post('/coupons', formattedValues);
        onAddCoupon(response.data);

        // Reset form
        formik.resetForm();
      } catch (error) {
        console.error('Error creating coupon:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-6 p-4 border rounded-md text-white">
      <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>

      <div className="mb-4">
        <label className="block mb-1">Coupon Code</label>
        <input
          type="text"
          {...formik.getFieldProps('code')}
          className="w-full p-2 border rounded text-black"
        />
        {formik.touched.code && formik.errors.code ? (
          <div className="text-red-500">{formik.errors.code}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Coupon Description</label>
        <input
          type="text"
          {...formik.getFieldProps('description')}
          className="w-full p-2 border rounded text-black"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Discount</label>
        <input
          type="number"
          {...formik.getFieldProps('discount')}
          className="w-full p-2 border rounded text-black"
        />
        {formik.touched.discount && formik.errors.discount ? (
          <div className="text-red-500">{formik.errors.discount}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select
          {...formik.getFieldProps('type')}
          className="w-full p-2 border rounded text-black"
        >
          <option value="FIXED">Fixed product discount</option>
          <option value="PERCENTAGE">Percentage discount</option>
        </select>
        {formik.touched.type && formik.errors.type ? (
          <div className="text-red-500">{formik.errors.type}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Coupon Start Date</label>
        <input
          type="date"
          {...formik.getFieldProps('startDate')}
          className="w-full p-2 border rounded text-black"
        />
        {formik.touched.startDate && formik.errors.startDate ? (
          <div className="text-red-500">{formik.errors.startDate}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Expiry Date</label>
        <input
          type="date"
          {...formik.getFieldProps('endDate')}
          className="w-full p-2 border rounded text-black"
        />
        {formik.touched.endDate && formik.errors.endDate ? (
          <div className="text-red-500">{formik.errors.endDate}</div>
        ) : null}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Save Coupon
      </button>
    </form>
  );
}
