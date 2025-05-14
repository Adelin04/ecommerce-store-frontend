import LoadingSpin from "react-loading-spin";

const Loading = () => {
    // You can add any UI inside Loading, including a Skeleton.
    return <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><LoadingSpin primaryColor="salmon" secondaryColor="#ffffff" size="200px" width={'2'}/></div>
}

export default Loading