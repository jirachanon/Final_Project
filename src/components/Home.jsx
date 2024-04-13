import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import Nav from './Nav'

function Home() {

  const { user } = useSelector((state) => state.slices)
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    if (!(param.param1 === user?.token)) {
      Swal.fire({
        title: 'กรุณาเข้าสู่ระบบอีกครั้ง',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        liff.closeWindow();
        navigate("/")
      })
    }
  },)

  return (
    <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-lvh'>
      <Nav />
    </div>
  )
}

export default Home