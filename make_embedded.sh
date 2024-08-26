cd lectures
cd lecture01
npx webpack ./src/intro_cpp_fundamentals.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/intro_cpp_fundamentals.html
mv assets/main.js assets/intro_cpp_fundamentals.js
sed -i 's/main\.js/intro_cpp_fundamentals\.js/' assets/intro_cpp_fundamentals.html
cd ..
cd lecture02
npx webpack ./src/test.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/test.html
mv assets/main.js assets/test.js
sed -i 's/main\.js/test\.js/' assets/test.html
cd ..
cd lecture03
npx webpack ./src/pass_by_pointer.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/pass_by_pointer.html
mv assets/main.js assets/pass_by_pointer.js
sed -i 's/main\.js/pass_by_pointer\.js/' assets/pass_by_pointer.html
cd ..
cd lecture03
npx webpack ./src/pointer_mischief.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/pointer_mischief.html
mv assets/main.js assets/pointer_mischief.js
sed -i 's/main\.js/pointer_mischief\.js/' assets/pointer_mischief.html
cd ..
cd lecture03
npx webpack ./src/using_pointers.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/using_pointers.html
mv assets/main.js assets/using_pointers.js
sed -i 's/main\.js/using_pointers\.js/' assets/using_pointers.html
cd ..
cd lecture04
npx webpack ./src/maxValue.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/maxValue.html
mv assets/main.js assets/maxValue.js
sed -i 's/main\.js/maxValue\.js/' assets/maxValue.html
cd ..
cd lecture04
npx webpack ./src/pointer_arithmetic.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/pointer_arithmetic.html
mv assets/main.js assets/pointer_arithmetic.js
sed -i 's/main\.js/pointer_arithmetic\.js/' assets/pointer_arithmetic.html
cd ..
cd lecture05
npx webpack ./src/struct_basics.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/struct_basics.html
mv assets/main.js assets/struct_basics.js
sed -i 's/main\.js/struct_basics\.js/' assets/struct_basics.html
cd ..
cd lecture07
npx webpack ./src/strcpy.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/strcpy.html
mv assets/main.js assets/strcpy.js
sed -i 's/main\.js/strcpy\.js/' assets/strcpy.html
cd ..
cd lecture08
npx webpack ./src/halfPerimeter.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/halfPerimeter.html
mv assets/main.js assets/halfPerimeter.js
sed -i 's/main\.js/halfPerimeter\.js/' assets/halfPerimeter.html
cd ..
cd lecture09
npx webpack ./src/rectangle.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/rectangle.html
mv assets/main.js assets/rectangle.js
sed -i 's/main\.js/rectangle\.js/' assets/rectangle.html
cd ..
cd lecture09
npx webpack ./src/birds_compile_errors.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/birds_compile_errors.html
mv assets/main.js assets/birds_compile_errors.js
sed -i 's/main\.js/birds_compile_errors\.js/' assets/birds_compile_errors.html
cd ..
cd lecture09
npx webpack ./src/pixel_operator_overloads.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/pixel_operator_overloads.html
mv assets/main.js assets/pixel_operator_overloads.js
sed -i 's/main\.js/pixel_operator_overloads\.js/' assets/pixel_operator_overloads.html
cd ..
cd lecture11
npx webpack ./src/intset_insert.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/intset_insert.html
mv assets/main.js assets/intset_insert.js
sed -i 's/main\.js/intset_insert\.js/' assets/intset_insert.html
cd ..
cd lecture12
npx webpack ./src/sortedintset_insert.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/sortedintset_insert.html
mv assets/main.js assets/sortedintset_insert.js
sed -i 's/main\.js/sortedintset_insert\.js/' assets/sortedintset_insert.html
cd ..
cd lecture13
npx webpack ./src/object_lifetimes.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/object_lifetimes.html
mv assets/main.js assets/object_lifetimes.js
sed -i 's/main\.js/object_lifetimes\.js/' assets/object_lifetimes.html
cd ..
cd lecture14
npx webpack ./src/unsortedintset_grow.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/unsortedintset_grow.html
mv assets/main.js assets/unsortedintset_grow.js
sed -i 's/main\.js/unsortedintset_grow\.js/' assets/unsortedintset_grow.html
cd ..
cd lecture15
npx webpack ./src/big_three.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/big_three.html
mv assets/main.js assets/big_three.js
sed -i 's/main\.js/big_three\.js/' assets/big_three.html
cd ..
cd lecture15
npx webpack ./src/shallow_copy.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/shallow_copy.html
mv assets/main.js assets/shallow_copy.js
sed -i 's/main\.js/shallow_copy\.js/' assets/shallow_copy.html
cd ..
cd lecture15
npx webpack ./src/unsortedintset_assignment_op.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/unsortedintset_assignment_op.html
mv assets/main.js assets/unsortedintset_assignment_op.js
sed -i 's/main\.js/unsortedintset_assignment_op\.js/' assets/unsortedintset_assignment_op.html
cd ..
cd lecture15
npx webpack ./src/unsortedintset_copy_ctor.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/unsortedintset_copy_ctor.html
mv assets/main.js assets/unsortedintset_copy_ctor.js
sed -i 's/main\.js/unsortedintset_copy_ctor\.js/' assets/unsortedintset_copy_ctor.html
cd ..
cd lecture19
npx webpack ./src/array_reverse.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/array_reverse.html
mv assets/main.js assets/array_reverse.js
sed -i 's/main\.js/array_reverse\.js/' assets/array_reverse.html
cd ..
cd lecture19
npx webpack ./src/ducks.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/ducks.html
mv assets/main.js assets/ducks.js
sed -i 's/main\.js/ducks\.js/' assets/ducks.html
cd ..
cd lecture20
npx webpack ./src/list_max.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/list_max.html
mv assets/main.js assets/list_max.js
sed -i 's/main\.js/list_max\.js/' assets/list_max.html
cd ..
cd lecture20
npx webpack ./src/tree_height.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/tree_height.html
mv assets/main.js assets/tree_height.js
sed -i 's/main\.js/tree_height\.js/' assets/tree_height.html
cd ..
cd lecture21
npx webpack ./src/bst_contains.ts --config ../../lobster/webpack.config.js
mv assets/main.html assets/bst_contains.html
mv assets/main.js assets/bst_contains.js
sed -i 's/main\.js/bst_contains\.js/' assets/bst_contains.html
cd ..
