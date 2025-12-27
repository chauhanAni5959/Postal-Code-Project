function PostOfficeCard({ po }) {
  return (
    <div className="card">
      <p><strong>Name</strong>: {po.Name}</p>
      <p>Branch Type: {po.BranchType}</p>
      <p>Delivery Status: {po.DeliveryStatus}</p>
      <p>District: {po.District}</p>
      <p>State: {po.State}</p>
      <p>Pincode: {po.Pincode}</p>
    </div>
  );
}

export default PostOfficeCard;
