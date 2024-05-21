import Nav from "../components/Nav";
import TablaCustomerPurchases from "../components/TablaCustomerPurchases";

import Sidebar from "../components/Sidebar";

function CustomerPurchases() {

    return (
        <>
            <div>
                <Nav />
            </div>

            <div className="container-sidebar">
                <Sidebar />
                <div>

                    <TablaCustomerPurchases />

                </div>
            </div>

        </>
    )
}

export default CustomerPurchases;