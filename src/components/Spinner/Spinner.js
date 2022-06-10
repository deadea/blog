import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.loadingio}>
      <div className={classes.spinner}>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
