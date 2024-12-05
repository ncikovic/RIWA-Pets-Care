export default async ({ app }) => {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCToyEGl3RByNj6mkn4l_S6vdozP0YYMyA';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
};
