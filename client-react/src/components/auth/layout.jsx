import './layout.css';

export default function AuthLayout({ forms = [], Button }) {
  return (
    <div className="auth_layout">
      {
        forms.map((Form, index) => (
          <div className='auth_form' key={index}>
            <Form />
          </div>
        ))
      }
      <Button />
    </div>
  )
}