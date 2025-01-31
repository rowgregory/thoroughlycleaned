import React from 'react'
import AppleLoader from '../common/AppleLoader'

const AdminFormFooter = ({ reset, isUpdating, type, loading, error }: any) => (
  <div className="bg-[#161616] rounded-2xl 1200:rounded-tl-none 1200:rounded-tr-none gap-y-6 480:gap-y-0 py-6 px-5 flex flex-col 480:flex-row items-center justify-between w-full max-w-md 1200:max-w-full">
    <button onClick={reset} type="button" className="bg-[#333336] hover:bg-[#38383c] px-5 py-1.5 rounded-lg text-white w-full 480:w-36">
      Back
    </button>
    <div className="flex items-center gap-x-3 w-full 480:w-fit">
      {loading && <AppleLoader />}
      {error && <div className="text-red-500 text-[10px]">{error}</div>}
      <button
        disabled={loading}
        type="submit"
        className="bg-neonSkyAqua hover:bg-skyAqua px-5 py-1.5 rounded-lg text-white disabled:cursor-not-allowed disabled:bg-sky-700 flex gap-x-2 items-center w-full 480:w-fit justify-center"
      >
        {isUpdating ? 'Update' : 'Create'} {type}
      </button>
    </div>
  </div>
)

export default AdminFormFooter
