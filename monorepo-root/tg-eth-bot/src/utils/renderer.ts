/**
 * 渲染状态UI
 * @param state
 */
export const renderStateUI = (state?: boolean | number) => {
	return Boolean(state) ? '✅' : '❌';
};