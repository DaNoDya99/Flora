import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api/api';

const reportsSlice = createSlice({
    name : 'reports',
    initialState : {
        data : {
            weeklyTotalIncome : 0,
            pendingOrders : 0,
            ordersReceived : 0,
            deliveredOrdersLastDay : 0,
            topSellingBouquets : [],
            incomeComparison : {},
            lowQuantityProducts : [],
            pendingDeliveryCounts : 0,
            completedDeliveryCounts : 0,
            failedDeliveryCounts : 0,
            overallDeliveryPerformance : 0,
            deliveryFailureDetails : [],
            ordersDeliveredWithinTheWeek : [],
            ordersDeliveredByEachDeliveryPerson : []
        }
    },
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(totalIncomeThisWeek.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.weeklyTotalIncome = action.payload.weeklyTotalIncome;
            }
        }).addCase(numberOfOrdersYesterday.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.ordersReceived = action.payload.numberOfOrdersPerDay;
            }
        }).addCase(numberOfPendingOrders.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.pendingOrders = action.payload.numberOfPendingOrders;
            }
        }).addCase(numberOfOrdersDeliveredYesterday.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.deliveredOrdersLastDay = action.payload.numberOfOrdersDeliveredYesterday;
            }
        }).addCase(topSellingBouquetsWithinTheWeek.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.topSellingBouquets = action.payload.topSellingBouquets;
            }
        }).addCase(lowQuantityProducts.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.lowQuantityProducts = action.payload.lowQunatityProducts;
            }
        }).addCase(dailyIncomeThisWeekVsLastWeek.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.incomeComparison = action.payload.dailyIncome;
            }
        }).addCase(pendingDeliveryCounts.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.pendingDeliveryCounts = action.payload.pendingDeliveries;
            }
        }).addCase(completedOrdersCount.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.completedDeliveryCounts = action.payload.completedDeliveries;
            }
        }).addCase(failedOrdersCount.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.failedDeliveryCounts = action.payload.failedDeliveries;
            }
        }).addCase(deliveryPerformance.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                if(state.data.overallDeliveryPerformance !== null){
                    state.data.overallDeliveryPerformance = action.payload.deliveryPerformance;
                }
            }
        }).addCase(deliveryFailureDetails.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.deliveryFailureDetails = action.payload.deliveryFailureDetails;
            }
        }).addCase(ordersDeliveredWithinTheWeek.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.ordersDeliveredWithinTheWeek = action.payload.ordersDeliveredWithinTheWeek.reverse();
            }
        }).addCase(ordersDeliveredByEachDeliveryPerson.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.ordersDeliveredByEachDeliveryPerson = action.payload.ordersDeliveredByEachDeliveryPerson;
            }
        })
    }
})

export default reportsSlice.reducer;

export const totalIncomeThisWeek = createAsyncThunk(
    'reports/getTotalIncomeThisWeek',
    async () => {
        return api.get('/reports/total-income-this-week').then((response) => {
            return {
                weeklyTotalIncome : response.data.totalIncome,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const numberOfOrdersYesterday = createAsyncThunk(
    'reports/numberOfOrdersYesterday',
    async () => {
        return api.get('/reports/orders-last-day').then((response) => {
            return {
                numberOfOrdersPerDay : response.data.numberOfOrdersPerDay,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const numberOfPendingOrders = createAsyncThunk(
    'reports/numberOfPendingOrders',
    async () => {
        return api.get('/reports/pending-orders').then((response) => {
            return {
                numberOfPendingOrders : response.data.numberOfPendingOrders,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const numberOfOrdersDeliveredYesterday = createAsyncThunk(
    'reports/numberOfOrdersDeliveredYesterday',
    async () => {
        return api.get('/reports/orders-delivered-yesterday').then((response) => {
            return {
                numberOfOrdersDeliveredYesterday : response.data.numberOfOrdersDeliveredYesterday,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const topSellingBouquetsWithinTheWeek = createAsyncThunk(
    'reports/topSellingBouquetsWithinTheWeek',
    async () => {
        return api.get('/reports/top-selling-bouquets').then((response) => {
            return {
                topSellingBouquets : response.data.topSellingBouquets,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const lowQuantityProducts = createAsyncThunk(
    'reports/lowQuantityProducts',
    async () => {
        return api.get('/reports/low-quantity-products').then((response) => {
            return {
                lowQunatityProducts : response.data.lowQunatityProducts,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const dailyIncomeThisWeekVsLastWeek = createAsyncThunk(
    'reports/dailyIncomeThisWeekVsLastWeek',
    async () => {
        return api.get('/reports/daily-income-comparison').then((response) => {
            return {
                dailyIncome : response.data.dailyIncome,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const pendingDeliveryCounts = createAsyncThunk(
    'reports/pendingDeliveryCounts',
    async (id) => {
        return api.get('/reports/pending-delivery-orders-count/'+id).then((response) => {
            return {
                pendingDeliveries : response.data.pendingDeliveries,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const completedOrdersCount = createAsyncThunk(
    'reports/completedOrdersCount',
    async (id) => {
        return api.get('/reports/completed-delivery-orders/'+id).then((response) => {
            return {
                completedDeliveries : response.data.completedDeliveries,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const failedOrdersCount = createAsyncThunk(
    'reports/failedOrdersCount',
    async (id) => {
        return api.get('/reports/failed-delivery-orders/'+id).then((response) => {
            return {
                failedDeliveries : response.data.failedDeliveries,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const deliveryPerformance = createAsyncThunk(
    'reports/deliveryPerformance',
    async (id) => {
        return api.get('/reports/overall-delivery-performance/'+id).then((response) => {
            return {
                deliveryPerformance : response.data.deliveryPerformance,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const deliveryFailureDetails = createAsyncThunk(
    'reports/deliveryFailureDetails',
    async (id) => {
        return api.get('/reports/failed-delivery-details/'+id).then((response) => {
            return {
                deliveryFailureDetails : response.data.deliveryFailureDetails,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const ordersDeliveredWithinTheWeek = createAsyncThunk(
    'reports/ordersDeliveredWithinTheWeek',
    async (id) => {
        return api.get('/reports/order-count-delivered/'+id).then((response) => {
            return {
                ordersDeliveredWithinTheWeek : response.data.ordersDeliveredWithinTheWeek,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)

export const ordersDeliveredByEachDeliveryPerson = createAsyncThunk(
    'reports/ordersDeliveredByEachDeliveryPerson',
    async () => {
        return api.get('/reports/order-count-delivered-by-each').then((response) => {
            return {
                ordersDeliveredByEachDeliveryPerson : response.data.ordersDeliveredByEachDeliveryPerson,
                statusFlag : 'success'
            }
        }).catch((error) => {
            return {
                statusFlag : 'failed',
                error : error.response.data
            }
        })
    }
)