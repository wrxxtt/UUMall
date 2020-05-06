<template>
  <div class="wrapper">
    <ul class="content">
      <li>ahsj1</li>
      <li>ahsj2</li>
      <li>ahsj3</li>
      <li>ahsj4</li>
      <li>ahsj5</li>
      <li>ahsj6</li>
      <li>ahsj7</li>
      <li>ahsj8</li>
      <li>ahsj9</li>
      <li>ahsj10</li>
      <li>ahsj11</li>
      <li>ahsj12</li>
      <li>ahsj13</li>
      <li>ahsj14</li>
      <li>ahsj15</li>
      <li>ahsj16</li>
      <li>ahsj17</li>
      <li>ahsj18</li>
      <li>ahsj19</li>
      <li>ahsj20</li>
      <li>ahsj21</li>
      <li>ahsj22</li>
      <li>ahsj23</li>
      <li>ahsj24</li>
      <li>ahsj25</li>
      <li>ahsj26</li>
      <li>ahsj27</li>
      <li>ahsj28</li>
      <li>ahsj29</li>
      <li>ahsj30</li>
      <li>ahsj31</li>
      <li>ahsj32</li>
      <li>ahsj33</li>
      <li>ahsj34</li>
      <li>ahsj35</li>
      <li>ahsj36</li>
      <li>ahsj37</li>
      <li>ahsj38</li>
      <li>ahsj39</li>
      <li>ahsj40</li>
      <li>ahsj41</li>
      <li>ahsj42</li>
      <li>ahsj43</li>
      <li>ahsj44</li>
      <li>ahsj45</li>
      <li>ahsj46</li>
      <li>ahsj47</li>
      <li>ahsj48</li>
      <li>ahsj49</li>
      <li>ahsj50</li>
      <li>ahsj51</li>
      <li>ahsj52</li>
      <li>ahsj53</li>
      <li>ahsj54</li>
      <li>ahsj55</li>
      <li>ahsj56</li>
      <li>ahsj57</li>
      <li>ahsj58</li>
      <li>ahsj59</li>
      <li>ahsj60</li>
      <li>ahsj61</li>
      <li>ahsj62</li>
      <li>ahsj63</li>
      <li>ahsj64</li>
      <li>ahsj65</li>
      <li>ahsj66</li>
      <li>ahsj67</li>
      <li>ahsj68</li>
      <li>ahsj69</li>
      <li>ahsj70</li>
      <li>ahsj71</li>
      <li>ahsj72</li>
      <li>ahsj73</li>
      <li>ahsj74</li>
      <li>ahsj75</li>
      <li>ahsj76</li>
      <li>ahsj77</li>
      <li>ahsj78</li>
      <li>ahsj79</li>
      <li>ahsj80</li>
      <li>ahsj81</li>
      <li>ahsj82</li>
      <li>ahsj83</li>
      <li>ahsj84</li>
      <li>ahsj85</li>
      <li>ahsj86</li>
      <li>ahsj87</li>
      <li>ahsj88</li>
      <li>ahsj89</li>
      <li>ahsj90</li>
      <li>ahsj91</li>
      <li>ahsj92</li>
      <li>ahsj93</li>
      <li>ahsj94</li>
      <li>ahsj95</li>
      <li>ahsj96</li>
      <li>ahsj97</li>
      <li>ahsj98</li>
      <li>ahsj99</li>
      <li>ahsj100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true
      })
      this.scroll.on('scroll', (position) => {
        // console.log(position);
      })
      this.scroll.on('pullingUp', () => {
        console.log("上拉加载更多")
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
  }
</style>
