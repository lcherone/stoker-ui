export default function ({
  store,
  redirect,
  route,
  error
}) {
  if (route.name === 'index') {
    return redirect('deployments')
  }

  store.state.site.loading = true
}
