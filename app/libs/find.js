export default {
	byId: function (arr, id) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id === id) return i;
		}
		console.warn('Item was not found', arr, id);
		return -1;
	}	
}
